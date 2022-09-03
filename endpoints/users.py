from silence.decorators import endpoint

@endpoint(
    route="/users",
    method="GET",
    sql="SELECT * FROM Users"
)

def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/users/$userId",
    method="GET",
    sql="SELECT * FROM Users WHERE userId = $userId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/users",
    method="POST",
    sql="INSERT INTO Users (firstName, lastName, telephone, email, username, password, avatarUrl) VALUES ($firstName, $lastName, $telephone, $email, $username, $password, $avatarUrl)",
    description="Creates a new user",
    auth_required=True,
)
def create(firstName, lastName, telephone, email, username, password, avatarUrl):
    pass

############################################################################### 