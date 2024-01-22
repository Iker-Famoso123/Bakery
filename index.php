<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Repostería Famoso</title>
        <link rel="icon" href="LOGO.png" type="image/png">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@600&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@800&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Figtree&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Heebo&display=swap" rel="stylesheet">
    </head>
    <body>

        <header>
            <nav class="navbar navbar-expand-lg bg-light fixed-top">
                <div class="container-fluid">
                    <a class="navbar-brand" href="index.php" ><img class="banner" src="LOGO.png"></a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
                            <li class="nav-item">
                                <a class="nav-link mx-lg-2 active" aria-current="page" href="#nosotros" style="font-family: 'Heebo', sans-serif;">Nosotros</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mx-lg-2" href="#inventory" style="font-family: 'Heebo', sans-serif;">Productos</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link mx-lg-2" href="#location" style="font-family: 'Heebo', sans-serif;">Ubicacion</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </header>

        <main>

            <div class="bread">

                <h1>Tradición familiar que<br>nos distingue... </h1>

            </div>

            <div class="container" id="nosotros">
                <h1 class="mainTitle" style="font-family: 'Inter Tight', sans-serif;">NOSOTROS</h1>
                 
                <p style="font-family: 'Figtree', sans-serif; text-align: justify;">
                Descubre Repostería Famoso, una tradición familiar que perdura desde 1960. Especializados en repostería fina, nos dedicamos a ofrecer auténticos productos de alta calidad. Enorgulleciéndonos de utilizar insumos selectos y evitar conservadores, apostamos por lo natural y artesanal para resaltar los sabores genuinos que nos definen.<br><br>

                Cada delicia refleja nuestra pasión y esmero, elaboradas artesanalmente con dedicación y cariño, siguiendo recetas transmitidas de generación en generación. En Repostería Famoso, no solo buscamos ofrecer exquisitos postres, sino también compartir una experiencia que celebra la riqueza de la repostería.<br><br>

                Agradecemos tu preferencia y te invitamos a disfrutar de cada bocado impregnado de historia, tradición y el sabor único que nos distingue.<br>
                </p>
                <p style="font-family: 'Figtree', sans-serif; text-align: center;">¡Bienvenidos a nuestra familia repostera!</p>
                <hr>

                <h1 id="inventory" style="font-family: 'Inter Tight', sans-serif;">PRODUCTOS</h1>
                <div class="products">
                    <div class="product-container">
                        <div class="item-container">
                            <img class="item-background" src="col.jpg">
                            <div class="text-img" style="top: 15%; left: 10%;">Coles</div>
                            <div class="description-item"></div>
                        </div>
                    </div>
                    <div class="product-container">
                        <div class="item-container">
                            <img class="item-background" src="donitas.jpg">
                            <div class="text-img" style="top: 20%; right: 10%;">Donitas</div>
                            <div class="description-item"></div>
                        </div>
                    </div>
                    <div class="product-container">
                        <div class="item-container">
                            <img class="item-background" src="estrellitas.jpg">
                            <div class="text-img" style="top: 15%; right: 10%;">Estrellitas<br>de nuez</div>
                            <div class="description-item"></div>
                        </div>
                    </div>
                    <div class="product-container">
                        <div class="item-container">
                            <img class="item-background" src="nidos.jpg">
                            <div class="text-img" style="top: 15%; left: 10%;">Nidos</div>
                            <div class="description-item"></div>
                        </div>
                    </div>
                    <div class="product-container">
                        <div class="item-container">
                            <img class="item-background" src="rollitos.jpg">
                            <div class="text-img" style="top: 15%; right: 10%;">Rollitos de<br>membrillo</div>
                            <div class="description-item"></div>
                        </div>
                    </div>
                </div>

                <hr>
            
                <div class="map-container" id="location">
                    <h1 style="font-family: 'Inter Tight', sans-serif;">VISITANOS</h1>
                    <iframe id="map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1370.8774459117442!2d-103.60402473281059!3d19.883970502869825!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84258124db5f0985%3A0x9a31d8e861e8bd08!2sReposteria%20Famoso!5e0!3m2!1ses!2smx!4v1702159213199!5m2!1ses!2smx" width=60% height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

            </div>
            

            
        </main>

        <footer>

        </footer>

    </body>
</html>