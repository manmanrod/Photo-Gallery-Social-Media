from silence.decorators import endpoint;

@endpoint(
    route="/peliculas",
    method="GET",
    sql="SELECT * FROM Peliculas ORDER BY año",
    description="Todas las películas",
)
def get_all():
    pass