def details_user(user):
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "full_name": user["full_name"],
        "address": user["address"],
        "phone": user["phone"],
        "avatar": user["avatar"],
        "role": user["role"],
        "created_at": user["created_at"],
        "updated_at": user["updated_at"],
    }


def list_users(users):
    return [details_user(user) for user in users]


# Compare this snippet from app/controllers/user_controller.py:
