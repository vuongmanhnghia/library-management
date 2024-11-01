def detail_user(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "password": user["password"],
    }


def list_users(users) -> list:
    return [detail_user(user) for user in users]
