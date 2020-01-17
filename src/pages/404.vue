<template lang="pug">
  Layout
    v-container
      v-layout(justify-center)
        v-flex(xs8).text-center
            h1 404: No URL Found 
            p このURL は現在、設定されていません。URL パスをもう一度ご確認ください。

</template>

<script>
export default {
  metaInfo: {
    title: 'About us'
  }
}
</script>
