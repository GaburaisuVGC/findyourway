<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-white border-b">
      <div class="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 class="text-xl font-bold text-slate-700">Edumapper - Test</h1>
      </div>
    </header>

    <main class="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
      <slot />
    </main>
  </div>
</template>