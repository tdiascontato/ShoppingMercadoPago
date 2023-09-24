const mongoose = require('mongoose');
const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
});
module.exports = mongoose.model('Login', LoginSchema);
//const validator = require('validator');
//const bcryptjs = require('bcryptjs');
/*
class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.valida();
    if(this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if(!this.user) {
      this.errors.push('Usuário não existe.');
      return;
    }

    if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha inválida');
      this.user = null;
      return;
    }
  }

    async valida(){
        //validar email e senha
        this.cleanUp();
        if(!validator.isEmail(this.body.email)) this.errors.push('Opa! Email inválido!');
        if(this.body.password.length < 6 || this.body.length > 20) this.errors.push('Opa! 6 <= caracteres da senha <= 20');
    }
    async cleanUp(){
        for(const key in this.body){//acessando as partes do body
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}
module.exports = Login;
*/