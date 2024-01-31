<template>
    <div class="flex items-center justify-between my-3">
        <div class="text-[24px]">{{ title }}</div>
        <input
            type="text"
            placeholder="Search"
            class="border rounded-md py-1 px-2"
        />
    </div>
    <slot></slot>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Page Title'
        }
    }
}
</script>