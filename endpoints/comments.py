from silence.decorators import endpoint

@endpoint(
    route="/comments",
    method="GET",
    sql="SELECT * FROM Comments"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/comments/$photoId",
    method="GET",
    description="Obtener los comentarios de una foto",
    sql="SELECT * FROM Comments WHERE photoId = $photoId"
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/comments",
    method="POST",
    sql="INSERT INTO Comments (userId, photoId, text) VALUES ($userId, $photoId, $text)",
    description="Creates a new photo",
    auth_required=False,
)
def create(userId, photoId, text):
    pass

###############################################################################
@endpoint(
    route="/comments/$commentId",
    method="DELETE",
    sql="DELETE FROM Comments WHERE commentId = $commentId",
    description="Removes a comment",
    auth_required=False,
)
def delete():
    pass

############################################################################## 