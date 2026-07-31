<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Dashboard de presencia en tiempo real de 490ur5 con Música y Steam">
    <title>490ur5 Presence Dashboard | aruda</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet">


    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body class="min-h-screen w-full flex justify-center items-center px-4 py-8 relative overflow-hidden text-slate-100">
    <div
        class="absolute rounded-full pointer-events-none transition-all duration-1000 ease-in-out opacity-25 blur-[130px] w-[600px] h-[600px] z-[-1] top-[-100px] left-[-100px] bg-brand-blue">
    </div>
    <div
        class="absolute rounded-full pointer-events-none transition-all duration-1000 ease-in-out opacity-20 blur-[130px] w-[600px] h-[600px] z-[-1] bottom-[-100px] right-[-100px] bg-brand-yellow">
    </div>

    <div id="app" class="w-full max-w-[1200px] flex flex-col gap-6 z-10"></div>
</body>

</html>