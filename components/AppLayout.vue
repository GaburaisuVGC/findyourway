<template>
  <div class="min-h-screen flex flex-col" style="background-color: #F7F3F0;">
    <header class="bg-white min-h-[60px] flex items-center">
      <div class="w-full px-4 md:px-8 lg:px-16 xl:px-24">
        <h1 class="text-xl font-bold text-slate-700" style="margin-left: 8px;">Edumapper</h1>
      </div>
    </header>

    <main class="flex-1 py-8">
      <div class="w-full max-w-sm mx-auto px-4 sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl md:px-8 lg:px-16 xl:px-24">
        <slot />
      </div>
    </main>
  </div>
</template>