import { Console } from 'console';
import * as puppeteer from 'puppeteer';

const URL = 'https://amazon.in';
const username = "dishantsethi14@gmail.com"
const password = ""
const query = "Baseball"

const initBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  return browser;
};

type resultType = {
  title: string
  price: Number
  is_amazon_choice: boolean
  rating: Number
  rating_count: Number
  is_prime: Boolean
}

const login = async (page: puppeteer.Page, browser: puppeteer.Browser) => {
  await page.goto(URL)
  const loginHref = await page.$eval("a#nav-link-accountList", (elm) => elm.href);
  const loginPage = await browser.newPage();

  await loginPage.goto(loginHref)
  
  await loginPage.waitForSelector('#ap_email')
  await loginPage.type('#ap_email', username)
  await loginPage.click('#continue')

  await loginPage.waitForFunction((sel) => {
    return document.querySelectorAll(sel).length
  },{timeout:10000},"#auth-error-message-box" + ", " + "#ap_password");

  try{
    await loginPage.waitForSelector('#auth-error-message-box', {timeout: 100})
    console.log("Incorrect Email/Username")
    return process.exit(1)
  } catch (e) {
    await loginPage.waitForSelector('#ap_password')
    await loginPage.type('#ap_password', password)
    await loginPage.click('#signInSubmit')
    return loginPage
  }

}

const search = async (page: puppeteer.Page, browser: puppeteer.Browser) => {
  await page.waitForFunction((sel) => {
    return document.querySelectorAll(sel).length
  },{timeout:10000},"#auth-error-message-box" + ", " + "#twotabsearchtextbox");

  try {
    await page.waitForSelector('#auth-error-message-box', {timeout:100})
    console.log("Incorrect Password")
    return process.exit(1)
  } catch (e) {
    await page.type('#twotabsearchtextbox', query)
    await page.click('#nav-search-submit-button')
    await page.waitForNavigation();
  }

  const variable = "me"

  try{
    const products = await page.evaluate(async() => {
      let results: resultType[] = [];
      const items = document.querySelectorAll(".s-result-item .s-card-border");
      for (let i = items.length; i--;) {
        const item = items[i];
        const title = item.querySelector("h2 > a > span");
        const amazon_choice = item.querySelector("div > span > span > span");
        const rating = item.querySelector("div > span > span > a > i > span");
        const price = item.querySelector(".a-price-whole");
        const rating_count = item.querySelector("span.a-size-base.s-underline-text");
        const prime = item.getElementsByClassName("s-prime");
        
        let is_amazon_choice = false
        let is_prime = false
  
        if (!title || !price || !rating || !rating_count) continue;
        if (amazon_choice?.textContent == "Amazon's Choice") {
          is_amazon_choice = true
        }
        if (prime){
          is_prime = true
        }
        results = [
          ...results,
          {
            title: String(title.textContent),
            price: parseInt(price.textContent!.replace(/,/g, ""), 10),
            is_amazon_choice: is_amazon_choice,
            rating: Number(rating.textContent?.substring(0,3)),
            rating_count: parseInt(rating_count.textContent!.replace(/,/g, ""), 10),
            is_prime: is_prime
          },
        ];
      }
      return results;
    });
    return products
  }
  catch (e) {
    console.log(e)
  }
  
}

(async () => {
  const browser = await initBrowser();
  const page = await browser.newPage();
  const loggedInPage = await login(page, browser);
  const products: any = await search(loggedInPage, browser);
  await browser.close();
  console.log(products)

  if(products.length >= 1) {
    fetch("http://localhost:3000/api/v1/amazon/send", {
      method: "POST",
      body: JSON.stringify({
          username: username,
          data: products
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    .catch(e => console.log(e))
    .then(response => response.json())
    .then(json => console.log(json));
  }

})();