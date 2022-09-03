from silence.decorators import endpoint

@endpoint(
    route="/ratings",
    method="GET",
    sql="SELECT * FROM ratings"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/ratings/$ratingId",
    method="GET",
    sql="SELECT * FROM ratings WHERE ratingId = $ratingId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/$photoId/ratings",
    method="GET",
    sql="SELECT AVG(value) value FROM ratings WHERE photoId = $photoId"
)
def get_by_photo_id():
    pass

###############################################################################
@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO ratings (photoId, userId, VALUE) VALUES ($photoId, $userId, $VALUE)",
    description="Creates a new rating",
    auth_required=True,
)
def create(photoId, userId, VALUE):
    pass

###############################################################################