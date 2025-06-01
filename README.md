# 🗳️ Voting API with Paystack Integration

![license](https://img.shields.io/badge/license-MIT-blue.svg)
![python](https://img.shields.io/badge/python-3.10%2B-blue)
![build](https://img.shields.io/badge/build-passing-brightgreen)



This is a full-featured backend API for managing and running online voting events. Built using **Django REST Framework**, it allows **organizers** to create events, add **contestants**, and enable **anonymous paid voting** via **Mobile Money using Paystack**.

---

## 🚀 Features

- **Organizer Authentication** using custom user model
- **Event Creation** with custom `event_id`
- **Contestant Management** scoped to organizer events
- **Mobile Money Voting** with Paystack
- **Vote Quantity + Pricing Logic**
- **Secure Payment Verification** before recording votes
- **IP tracking** to monitor voter activity
- **Admin Interface** with filtering and search

---

## 🧰 Tech Stack

- **Python 3.10+**
- **Django 4+**
- **Django REST Framework**
- **SimpleJWT** for token authentication
- **Swagger / drf-yasg** for API documentation
- **Paystack** for Mobile Money integration

---

## 🧪 API Overview

| Endpoint                                         | Description                                | Method |
|--------------------------------------------------|--------------------------------------------|--------|
| `/api/users/register/`                          | Register a new organizer                   | `POST` |
| `/api/users/login/`                             | Login to get JWT tokens                    | `POST` |
| `/api/organizers/events/public/`                | List events (public)                       | `GET`  |
| `/api/organizers/events/create/`                | Create new event (organizer only)          | `POST` |
| `/api/organizers/contestants/create/`           | Add contestant to event                    | `POST` |
| `/api/organizers/contestants/<event_id>/`       | List contestants for an event              | `GET`  |
| `/api/organizers/votes/<contestant_id>/`        | View contestant details before voting      | `GET`  |
| `/api/organizers/payments/init/`                | Initiate Paystack Mobile Money payment     | `POST` |
| `/api/organizers/payments/verify/`              | Verify payment and record vote             | `POST` |

---

## 💸 Payment Flow (via Paystack)

1. Voter selects a **contestant** and number of **votes**
2. Sends a `POST` to `/payments/init/` with:
   ```json
   {
     "phone_number": "0551234987",
     "contestant_id": 5,
     "quantity": 3,
     "provider": "mtn"
   }
   ```

3. Receives a `payment_url` and `reference`
4. Completes the payment via Paystack test MoMo interface
5. Sends a `POST` to `/payments/verify/` with:

   ```json
   {
     "reference": "txn_ref_001"
   }
   ```
6. If payment is successful, a **Vote** is recorded and the **Payment** is logged

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # or use venv\Scripts\activate on Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Set Up Environment Variables or Settings

Add your **Paystack keys** to `settings.py`:

```python
PAYSTACK_SECRET_KEY = 'sk_test_...'
PAYSTACK_PUBLIC_KEY = 'pk_test_...'
```

### 5. Run Migrations

```bash
python manage.py migrate
```

### 6. Start the Server

```bash
python manage.py runserver
```

---

## 📚 API Documentation

After running the server, access Swagger documentation at:

```
http://127.0.0.1:8000/swagger/
```

You can test every endpoint, see required fields, and view example responses.

---

## 🧑‍💼 Admin Panel

```bash
python manage.py createsuperuser
```

Log in at:

```
http://127.0.0.1:8000/admin/
```

To manage events, contestants, votes, and payments.

---

## 📦 Future Enhancements

* Add webhook support for automatic Paystack payment verification
* Add result dashboards with charts
* SMS or email receipts for voters
* Export votes and payment logs to CSV
* IP- and phone-number–based rate limiting

---

## 🧑‍💻 Contributing

Fork the project, create a feature branch, and submit a pull request. Contributions are welcome!

---

## 🛡 License

This project is licensed under the MIT License.
