<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Breddit</title>

    <!-- Fonts -->


    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" />
    <style>
        .container {
            width: 100%;
        }
        #all-subbreddits {
            height: 600px;
            overflow: scroll;
        }
        #posts {
            height: 300px;
            overflow: scroll;
            font-size: 12px;
        }
    </style>

</head>
<body>

    <div id="content">

    </div>


    <!-- JavaScripts -->

    <!-- asset maps to "public" folder -->
    <script src="{{ asset('js/bundle.js') }}"></script>

</body>
</html>