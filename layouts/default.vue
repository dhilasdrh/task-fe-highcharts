<template>
    <div class="flex bg-primary text-gray-200 py-4 px-3">
        <div class="text-2xl font-bold"> BTJ Charts</div>
        <div class="flex justify-end space-x-4  ml-auto">
            <NuxtLink
                to="/"
                class="px-3 py-2 rounded-md hover:font-bold">
                Basic
            </NuxtLink>
            <NuxtLink
                to="/advance"
                class="px-3 py-2 rounded-md hover:font-bold">
                Advance
            </NuxtLink>
            <NuxtLink
                to="/post-test"
                class="px-3 py-2 rounded-md hover:font-bold">
                Post-Test
            </NuxtLink>
        </div>
    </div>
</template>
