import os
import pandas as pd
from ase import Atoms
from ase.io import read, write
from ase.constraints import FixAtoms
from ase.optimize import BFGS
from gpaw import GPAW, PW, FermiDirac
import numpy as np

# Define the directory with CIF files and the output directory
cif_directory = '/home/sowiredumensah/lustre/project/remake/cif_directory'
output_directory = '/home/sowiredumensah/lustre/project/remake/output_directory'
optimized_directory = '/home/sowiredumensah/lustre/project/remake/optimized_structures'
gpw_directory = '/home/sowiredumensah/lustre/project/remake/gpw_files'  # Directory for .gpw files

for dir_path in [output_directory, optimized_directory, gpw_directory]:
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

# Initialize lists to store results for properties and structure data
results = []
structure_results = []
missing_pristine_rows = []  # To track rows missing pristine energy
missing_fe_atom_rows = []  # To track rows missing Fe atom energy
pristine_energy = None  # To hold the pristine energy
fe_atom_energy = None  # To hold the Fe_atom energy

# Split CIF files
atom_cifs = {file.replace('_atom.cif', ''): file for file in os.listdir(cif_directory) if file.endswith('_atom.cif')}
doped_cifs = {file.split('Fe_dopedwith_')[1].replace('.cif', ''): file for file in os.listdir(cif_directory) if file.startswith('Fe_dopedwith_')}
co2_cifs = {file.split('CO2_Fe_dopedwith_')[1].replace('.cif', ''): file for file in os.listdir(cif_directory) if file.startswith('CO2_Fe_dopedwith_')}

# Loop through all doped CIF files and match them with the atom CIF files
for dopant, slab_file in doped_cifs.items():
    try:
        slab_atoms = read(os.path.join(cif_directory, slab_file))
        constraints = FixAtoms(mask=[atom.tag > 1 for atom in slab_atoms])
        slab_atoms.set_constraint(constraints)

        # Set up GPAW calculator for the slab
        slab_calc = GPAW(mode=PW(50),
                         xc='PBE',
                         kpts=(2, 2, 1),
                         occupations=FermiDirac(0.03),
                         txt=os.path.join(output_directory, f'gpaw_output_{slab_file}.txt'),
                         spinpol=True)

        slab_atoms.calc = slab_calc

        relaxer = BFGS(slab_atoms)
        relaxer.run(fmax=5)

        optimized_cif_path = os.path.join(optimized_directory, f'{slab_file}')
        write(optimized_cif_path, slab_atoms)

        slab_gpw_path = os.path.join(gpw_directory, f'Fe_dopedwith_{dopant}.gpw')
        slab_calc.write(slab_gpw_path)

        total_energy = slab_atoms.get_potential_energy()
        positions = slab_atoms.get_positions().tolist()
        cell_parameters = slab_atoms.get_cell().tolist()
        local_magnetic_moments = slab_atoms.get_magnetic_moments().tolist()
        total_magnetic_moment = slab_atoms.get_magnetic_moment()
        homo, lumo = slab_calc.get_homo_lumo()
        efermi = slab_calc.get_fermi_level()
        bandgap = lumo - homo
        chemical_potential = (lumo + homo) / 2

        e_potential = slab_calc.get_electrostatic_potential()
        z = np.linspace(0, slab_atoms.get_cell_lengths_and_angles()[2], len(e_potential))
        vacuum_region_start = int(len(z) * 0.85)
        vacuum_region_end = int(len(z))
        vacuum_potential = np.mean(e_potential[vacuum_region_start:vacuum_region_end])
        work_function = vacuum_potential - efermi

        entropy_st = np.nan
        free_energy = np.nan

        gpaw_output_file = os.path.join(output_directory, f'gpaw_output_{slab_file}.txt')
        with open(gpaw_output_file, 'r') as file:
            for line in file:
                # Search for entropy (-ST)
                if "Entropy (-ST):" in line:
                    entropy_st = float(line.split()[-1])
                
                elif "Free energy:" in line:
                    free_energy = float(line.split()[-1]) 

        temperature_eV = 0.03
        entropy = entropy_st / temperature_eV

        # Check if this is the pristine slab (Fe_dopedwith_Fe.cif)
        if slab_file.endswith('_Fe.cif'):
            pristine_energy = total_energy  # Save the pristine energy

            # Fill in the missing rows for pristine energy
            for row in missing_pristine_rows:
                row['Pristine Energy (eV)'] = pristine_energy

        co2_slab_file = co2_cifs.get(dopant, None)
        co2_slab_energy = np.nan
        if co2_slab_file:
            co2_slab_atoms = read(os.path.join(cif_directory, co2_slab_file))
            constraints = FixAtoms(mask=[atom.tag > 1 for atom in co2_slab_atoms])
            co2_slab_atoms.set_constraint(constraints)

            # Set up GPAW calculator for the CO2 slab
            co2_slab_calc = GPAW(mode=PW(50),
                                 xc='PBE',
                                 kpts=(2, 2, 1),
                                 occupations=FermiDirac(0.03),
                                 txt=os.path.join(output_directory, f'gpaw_output_{co2_slab_file}.txt'),
                                 spinpol=True)

            co2_slab_atoms.calc = co2_slab_calc

            relaxer = BFGS(co2_slab_atoms)
            relaxer.run(fmax=5)

            optimized_cif_path = os.path.join(optimized_directory, f'{co2_slab_file}')
            write(optimized_cif_path, co2_slab_atoms)
            co2_slab_energy = co2_slab_atoms.get_potential_energy()
            
            co2_slab_gpw_path = os.path.join(gpw_directory, f'co2_Fe_dopedwith_{dopant}.gpw')
            co2_slab_calc.write(co2_slab_gpw_path)
        
        # Check if the corresponding atom CIF exists
        atom_file = atom_cifs.get(dopant, None)
        atom_energy = None
        if atom_file:
            atom_atoms = read(os.path.join(cif_directory, atom_file))

            atom_calc = GPAW(mode=PW(50),
                             xc='PBE',
                             kpts=(1, 1, 1),
                             occupations=FermiDirac(0.03),
                             txt=os.path.join(output_directory, f'gpaw_output_{atom_file}.txt'))

            atom_atoms.calc = atom_calc

            atom_energy = atom_atoms.get_potential_energy()

            atom_gpw_path = os.path.join(gpw_directory, f'atom_{dopant}.gpw')
            atom_calc.write(atom_gpw_path)

        # Check if the atom CIF starts with 'Fe_atom'
        if atom_file and atom_file.startswith('Fe_atom'):
            fe_atom_energy = atom_energy  # Store Fe_atom energy if applicable

            # Fill in the missing rows for Fe atom energy
            for row in missing_fe_atom_rows:
                row['Fe Atom Energy (eV)'] = fe_atom_energy

        # Store slab and atom results in the list
        result = {
            'CIF file': slab_file,
            'Atom CIF file': atom_file if atom_file else np.nan,
            'Total Energy (eV)': total_energy,
            'Dopant Energy (eV)': atom_energy if atom_energy else np.nan,
            'CO2 Slab Energy': co2_slab_energy,
            'HOMO (eV)': homo,
            'LUMO (eV)': lumo,
            'Fermi Level (eV)': efermi,
            'Band Gap (eV)': bandgap,
            'Work Function (eV)': work_function,
            'Chemical Potential (eV)': chemical_potential,
            'Entropy (eV/K)': entropy,
            'Free Energy (eV)': free_energy,
            'Local Magnetic Moments': local_magnetic_moments,
            'Total Magnetic Moment': total_magnetic_moment,
            'Pristine Energy (eV)': pristine_energy if pristine_energy is not None else np.nan,  # Pristine energy column
            'Fe Atom Energy (eV)': fe_atom_energy if fe_atom_energy is not None else np.nan  # Fe_atom energy column
        }

        # If the energy hasn't been found yet, mark the row to be updated later
        if pristine_energy is None:
            missing_pristine_rows.append(result)
        if fe_atom_energy is None:
            missing_fe_atom_rows.append(result)

        results.append(result)

        structure_results.append({
            'CIF file': optimized_cif_path,
            'Positions': positions,
            'Cell Parameters': cell_parameters
        })

    except Exception as e:
        print(f"Error processing file {slab_file}: {e}")

# Save the results to CSV files
output_csv1 = os.path.join(output_directory, 'dft_results50_5.csv')
df = pd.DataFrame(results)
df.to_csv(output_csv1, index=False)

output_csv2 = os.path.join(output_directory, 'dft_struct_data50_5.csv')
df2 = pd.DataFrame(structure_results)
df2.to_csv(output_csv2, index=False)

print(f"Properties saved in {output_csv1}")
print(f"Structure data saved in {output_csv2}")

