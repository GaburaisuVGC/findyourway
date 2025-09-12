<template>
  <div class="min-h-screen flex flex-col" style="background-color: #F7F3F0;">
    <header class="bg-white min-h-[60px] flex items-center">
      <div class="w-full max-w-sm mx-auto px-4 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h1 class="text-xl font-bold text-slate-700">Edumapper</h1>
      </div>
    </header>

    <main class="flex-1 py-8">
      <div class="w-full max-w-sm mx-auto px-4 sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <slot />
      </div>
    </main>
  </div>
</template>