<template lang="pug">
    Layout
        v-container
            v-layout(justify-center align-center)
                v-flex(xs12 md10 lg8)
                    v-card
                        .pa-2
                            h2.text-center  LIFF Sample Page 
                        v-divider
                        v-list
                            v-list-item 
                                v-list-item-content 
                                    v-list-item-title AccountID: 
                                        span gash3afhajdrfafh
                            v-divider
                            v-list-item 
                                v-list-item-content 
                                    v-list-item-title Name: 
                                        span おかきょー
                            v-divider
                            v-list
                                v-list-item
                                    v-spacer
                                    v-btn(color="info" outlined width="30%" ) BLE 認証
                                    v-spacer
                        
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>