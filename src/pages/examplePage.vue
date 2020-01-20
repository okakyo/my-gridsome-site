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
                                    v-btn(color="info" outlined width="30%" @click="validateLogin()") BLE 認証
                                    v-spacer
                        
</template>
<script>

export default {
    methods:{
        validateLogin(){
            window.liff.login({ redirectUri: "https://1b7c4723.ngrok.io/example-page" });
        }
    },
    created:async ()=>{
        
        await window.liff.init({
            liffId: "xxxxx" // ! 先ほどメモしたものを入力してください。
        });

        //LINE内のブラウザかどうか
        if(window.liff.isInClient()){
            alert('LINE内のブラウザ');
            this.getProfile(); //LINE内で開いた場合は特にログイン処理なしで大丈夫
        }else{
        //外部ブラウザかどうか
            if(window.liff.isLoggedIn()){
                alert('外部ブラウザ');
                this.getProfile();
            }else{
                alert("LINEでログインされていません");
            }
        }
    }
}
</script>
<style scoped>

</style>