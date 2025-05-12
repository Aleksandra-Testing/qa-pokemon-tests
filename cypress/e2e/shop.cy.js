describe('Проверка покупки нового аватара', function () {
  it('e2e тест на покупку нового аватара для тренера', function () {

    // 1. Перейти на сайт
    cy.visit('https://pokemonbattle.ru/');

    // 2. Ввести логин и пароль
    cy.get('#k_email').type('USER_LOGIN');
    cy.get('#k_password').type('USER_PASSWORD');

    // 3. Подтвердить вход
    cy.get('button[type="submit"]').click();

    // 4. Подождать, пока аватар тренера станет видимым и кликнуть
    cy.get('.header_card_trainer').should('be.visible').click();

    // 5. Убедиться, что Cypress попал на страницу тренера (ждём появления кнопки смены аватара)
    cy.contains('Смена аватара', { timeout: 10000 }).should('be.visible').click();

    // 6. Ждём загрузки магазина (по заголовку)
    cy.contains('Магазин', { timeout: 10000 }).should('be.visible');

    // 7. Ждём и кликаем по кнопке "Купить" у первого доступного аватара
    cy.get('li.available', { timeout: 10000 })
      .first()
      .find('button')
      .should('contain', 'Купить')
      .click();

    // 8. Заполняем данные карты
    cy.get('.card_number').type('4620869113632996');
    cy.get('.card_csv').type('125');
    cy.get('.card_date').type('1226');
    cy.get('.card_name').type('GERMAN DOLNIKOV');

    // 9. Оплатить
    cy.get('.style_1_base_button_payment:visible').click(); 

    // 10. Подтверждение по СМС
    cy.get('.threeds_number', { timeout: 10000 }).type('56456');
    cy.get('.style_1_base_button_payment:visible').click();

    // 11. Проверить сообщение об успешной покупке
    cy.contains('Покупка прошла успешно', { timeout: 10000 }).should('be.visible');
  });
});
