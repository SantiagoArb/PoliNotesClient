

export class Usuario{

    private ID_USER:Number;
    private DOC_USER:String;
    private NICK_USER:String;
    private PASSWORD_USER:String;
    private NOMBRE_USER:String;
    private APELLIDOS_USER:String;
    private CELULAR_USER:String;
    private CORREO_USER:String;
    private ID_PERFIL_USER:Number;
    private ESTADO_USER:Number;

    constructor(){ }

    setId_user(ide:Number){
      this.ID_USER = ide;
    }
    getId_user(){
      return this.ID_USER;
    }
    setDoc_user(doc:String){
      this.DOC_USER = doc;
    }
    getDoc_user(){
      return this.DOC_USER;
    }

    setNick_user(nick:String){
      this.NICK_USER = nick;
    }
    getNick_user(){
      return this.NICK_USER;
    }

    getPassword_user() {
       return this.PASSWORD_USER;
   }

   setPassword_user(pass:String) {
       this.PASSWORD_USER = pass;
   }

    getNombre_user() {
       return this.NOMBRE_USER;
   }

   setNombre_user( name:String) {
       this.NOMBRE_USER = name;
   }

   getApellidos_user() {
       return this.APELLIDOS_USER;
   }

   setApellidos_user(apellidos_user:String) {
       this.APELLIDOS_USER = apellidos_user;
   }

   getCelular_user() {
       return this.CELULAR_USER;
   }

   setCelular_user(celular_user:String) {
       this.CELULAR_USER = celular_user;
   }

   getCorreo_user() {
       return this.CORREO_USER;
   }

   setCorreo_user( correo_user:String) {
       this.CORREO_USER = correo_user;
   }

   getId_perfil_user() {
       return this.ID_PERFIL_USER;
   }

   setId_perfil_user(id_perfil_user:Number) {
       this.ID_PERFIL_USER = id_perfil_user;
   }

   getEstado_user() {
       return this.ESTADO_USER;
   }

   setEstado_user( estado_user:Number) {
       this.ESTADO_USER = estado_user;
   }



}
