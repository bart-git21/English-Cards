<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Repeat english words</title>
    <link rel="shortcut icon" href="src/static/style/favicon.ico" type="image/x-icon" />

    <!-- fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />

    <!-- bootstrap  -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
        crossorigin="anonymous"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
        integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
        crossorigin="anonymous"></script>

    <!-- jquery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <!-- inline scripts and styles -->
    <link rel="stylesheet" href="src/static/style/style.css" />
    <script defer type="module" src="dist/global.js"></script>
    <script defer type="module" src="dist/index.js"></script>
</head>

<body>
    <main>
        <div class="container ms-auto">
            <header class="row">
                <div class="col-md-3"></div>
                <nav class="col-md-9">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item flex-fill me-2" role="presentation">
                            <button class="nav-link active w-100" id="translation-tab" data-bs-toggle="tab"
                                data-bs-target="#translation" type="button" role="tab" aria-controls="translation"
                                aria-selected="true">
                                Translation
                            </button>
                        </li>
                        <li class="nav-item flex-fill me-2" role="presentation">
                            <button class="nav-link w-100" id="dragdrop-tab" data-bs-toggle="tab"
                                data-bs-target="#dragdrop" type="button" role="tab" aria-controls="dragdrop"
                                aria-selected="false">
                                Drag & Drop
                            </button>
                        </li>
                        <li class="nav-item flex-fill" role="presentation">
                            <button class="nav-link w-100" id="writing-tab" data-bs-toggle="tab"
                                data-bs-target="#writing" type="button" role="tab" aria-controls="writing"
                                aria-selected="false">
                                Writing
                            </button>
                        </li>
                    </ul>
                </nav>
            </header>

            <div class="row">
                <div class="col-md-3 d-flex flex-column">
                    <!-- textarea -->
                    <?php include "public/pages/textarea.php"; ?>
                </div>

                <div class="col-md-9">
                    <div id="tab_content" class="tab-content">
                        <!-- game tabs -->
                        <div class="card tab-pane active" id="translation" role="tabpanel"
                            aria-labelledby="translation-tab" tabindex="0">
                            <?php include "public/pages/translate.php"; ?>
                        </div>

                        <div class="card tab-pane" id="dragdrop" role="tabpanel" aria-labelledby="dragdrop-tab"
                            tabindex="0">
                            <?php include "public/pages/dragdrop.php"; ?>
                        </div>

                        <div class="card tab-pane" id="writing" role="tabpanel" aria-labelledby="writing-tab"
                            tabindex="0">
                            <?php include "public/pages/writing.php"; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button class="scroll-to-top__btn"></button>
    </main>
</body>

</html>