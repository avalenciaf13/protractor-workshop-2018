import { browser } from 'protractor';
import {
  MenuContentPage,
  ProductListPage,
  ProductAddedModalPage,
  SummaryStepPage,
  SingInStepPage,
  ShippingStepPage,
  PaymentStepPage,
  BankPaymentPage,
  OrdersummaryPage,
  AddressStepPage
} from '../src/page';

describe('Entering a shopping page', () => {
  beforeAll(async () => {
    await browser.get('http://automationpractice.com/');
  });

  describe('then should be bought a t-shirt', () => {
    beforeAll(async () => {
      const menuContentPage: MenuContentPage = new MenuContentPage();
      const productListPage: ProductListPage = new ProductListPage();
      const productAddedModalPage: ProductAddedModalPage = new ProductAddedModalPage();
      const summaryStepPage: SummaryStepPage = new SummaryStepPage();

      await menuContentPage.goToTShirtMenu();
      await productListPage.selectProduct('Faded Short Sleeve T-shirts');
      await productAddedModalPage.proceedToCheckout();
      await summaryStepPage.proceedToCheckout();
    });

    describe('log into the app', () => {
      beforeAll(async ()  => {
        const singInStepPage: SingInStepPage = new SingInStepPage();
        await singInStepPage.login('aperdomobo@gmail.com', 'WorkshopProtractor');
      });

      describe('and select your  address', () => {
        beforeAll(async ()  => {
          const addressStepPage: AddressStepPage = new AddressStepPage();
          await addressStepPage.proceedToCheckout();
        });

        describe('and pay to the bank', () => {
          beforeAll(async ()  => {
            const shippingStepPage: ShippingStepPage = new ShippingStepPage();
            const paymentStepPage: PaymentStepPage = new PaymentStepPage();
            const bankPaymentPage: BankPaymentPage = new BankPaymentPage();

            await shippingStepPage.acceptAndContinue();
            await paymentStepPage.payByBankWire();
            await bankPaymentPage.confirmOrder();
          });

          it('then the order should be finalized', async () => {
            const ordersummaryPage: OrdersummaryPage = new OrdersummaryPage();

            await expect(ordersummaryPage.getOrderTitle())
              .toBe('Your order on My Store is complete.');
          });
        });
      });
    });
  });
});
