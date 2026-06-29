class LoginPage {

constructor(page) {

 this.page = page;   
 this.userName = page.locator("#userEmail");
 this.password = page.locator("#userPassword");
 this.loginButton = page.locator("[value='Login']");
}

async navigateToLoginPage() {
    await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
}



async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.loginButton.click(); 
}
}
module.exports = {LoginPage};