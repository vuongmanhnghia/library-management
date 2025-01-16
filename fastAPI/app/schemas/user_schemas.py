def details_user(user):
    return {
        "email": user["email"],
        "full_name": user["full_name"],
        "phone_number": user["phone_number"],
        "avatar": user["avatar"],
        "role": user["role"],
    }


def list_users(users):
    return [details_user(user) for user in users]


# Compare this snippet from app/controllers/user_controller.py:
