import { test, expect } from '@playwright/test';

const HOME = 'https://inatel.br/home/';

test.describe('Testes na pagina HOME do Inatel', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test.beforeEach(async ({ page }) => {
    await page.goto(HOME);
    // Aceita apenas cookies essenciais. O site recarrega a página ~500ms depois
    // de salvar a preferência, então esperamos essa recarga terminar.
    await Promise.all([page.waitForEvent('load'), page.locator('.deniedCookie').click()]);
  });

  test('Pagina HOME Inatel existe', async ({ page }) => {
    await expect(page).toHaveTitle(/Inatel/);
    await expect(page.getByRole('link', { name: /Logotipo do Inatel/ }).first()).toBeVisible();
    await expect(page.locator('h1')).toContainText('Talento gera Tecnologia');
  });

  test('Validar texto do botão "Vestibular 2027"', async ({ page }) => {
    await expect(page.locator('.hero__actions a')).toContainText('Vestibular');
  });

  test('Validar se o botão "Vestibular 2027" funciona', async ({ page }) => {
    await page.locator('.hero__actions a').click();
    await expect(page).toHaveURL(/\/vestibular/);
  });

  test('Validar texto do botão "Mais notícias"', async ({ page }) => {
    await expect(page.locator('a.dx-btn[href$="/noticias"]')).toContainText('Mais notícias');
  });

  test('Validar se botão "Mais notícias" funciona', async ({ page }) => {
    await page.locator('a.dx-btn[href$="/noticias"]').click();
    await expect(page).toHaveURL(/\/noticias/);
  });

  const cards = [
    { nome: 'Graduação', href: '/vestibular', texto: 'Graduação' },
    { nome: 'Pós-Graduação', href: '/pos', texto: 'Pós-Graduação' },
    { nome: 'Mestrado e Doutorado', href: '/mestrado-doutorado', texto: 'Stricto Sensu' },
    { nome: 'Capacitações', href: '/treinamento', texto: 'Capacitações' },
  ];

  for (const card of cards) {
    test(`Valida redirecionamento ao clicar no card ${card.nome}`, async ({ page }) => {
      const link = page.locator(`a.dx-card[href$="${card.href}"]`);
      await expect(link).toContainText(card.texto);
      await link.click();
      await expect(page).toHaveURL(new RegExp(card.href));
    });
  }

  test('Valida link "Inatel Online" no rodapé', async ({ page }) => {
    const link = page.locator('.dx-footer a[href^="https://online.inatel.br"]').first();
    await expect(link).toContainText('Inatel Online');
    await expect(link).toHaveAttribute('href', /online\.inatel\.br/);
  });
});
