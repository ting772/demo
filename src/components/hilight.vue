<template>
  <pre class="pre"><code :class="lang" ref="codeRef">{{ code }}</code></pre>
</template>
<script setup lang="ts">
import "prismjs/themes/prism-tomorrow.min.css"
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript.min.js'


const props = defineProps<{
  code: string;//代码
  lang?: string;//代码语言
}>()

const codeRef = ref()
const lang = computed(() => props.lang ? `lang-${props.lang}` : 'auto')

onMounted(() => {
  Prism.highlightElement(codeRef.value);
})

</script>

<style lang="scss">
.pre {
  height: 100%;
  width: fit-content;
  box-sizing: border-box;
  min-width: 100%;
  max-height: 100%;
}
</style>
