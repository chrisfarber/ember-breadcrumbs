import { module, test } from 'qunit';
import { visit, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | ember-breadcrumbs', function(hooks) {
  setupApplicationTest(hooks);

  test('should display two breadcrumbs on entering subroute and provide correct links', async function(assert) {
    await visit('/account/password');

    let breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');

    assert.equal(breadcrumbLinks.length, 2);
    assert.equal(breadcrumbLinks[0].textContent.trim(), 'account');
    assert.equal(breadcrumbLinks[0].getAttribute('href'), '/account');
    assert.equal(breadcrumbLinks[1].textContent.trim(), 'password');
    assert.equal(breadcrumbLinks[1].getAttribute('href'), '/account/password');
  });

  test('should update on following breadcrumb link', async function(assert) {
    await visit('/account/password');

    let breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');

    await click(breadcrumbLinks[0]);

    breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');

    assert.equal(breadcrumbLinks.length, 1);
    assert.equal(breadcrumbLinks[0].textContent.trim(), 'account');
    assert.equal(breadcrumbLinks[0].getAttribute('href'), '/account');
  });

  test('should update on following application link and skip routes w/o breadcrumb', async function(assert) {
    await visit('/account/password');

    await click(document.querySelectorAll('.map-link')[7]);

    let breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');

    assert.equal(breadcrumbLinks.length, 2);
    assert.equal(breadcrumbLinks[0].textContent.trim(), 'tools');
    assert.equal(breadcrumbLinks[0].getAttribute('href'), '/tools');
    assert.equal(breadcrumbLinks[1].textContent.trim(), 'new screwdriver');
    assert.equal(breadcrumbLinks[1].getAttribute('href'), '/tools/screwdriver/new');

    await click(document.querySelectorAll('.map-link')[5]);

    breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');

    assert.equal(breadcrumbLinks.length, 3);
    assert.equal(breadcrumbLinks[0].textContent.trim(), 'tools');
    assert.equal(breadcrumbLinks[0].getAttribute('href'), '/tools');
    assert.equal(breadcrumbLinks[1].textContent.trim(), 'hammer');
    assert.equal(breadcrumbLinks[1].getAttribute('href'), '/tools/hammer');
    assert.equal(breadcrumbLinks[2].textContent.trim(), 'new');
    assert.equal(breadcrumbLinks[2].getAttribute('href'), '/tools/hammer/new');
  });

  test('should update on setting breadcrumb', async function(assert) {
    await visit('/tools/hammer');

    let breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');

    assert.equal(breadcrumbLinks.length, 2);
    assert.equal(breadcrumbLinks[0].textContent.trim(), 'tools');
    assert.equal(breadcrumbLinks[0].getAttribute('href'), '/tools');
    assert.equal(breadcrumbLinks[1].textContent.trim(), 'hammer');
    assert.equal(breadcrumbLinks[1].getAttribute('href'), '/tools/hammer');

    await click(document.querySelector('.knock'));

    breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');

    assert.equal(breadcrumbLinks.length, 2);
    assert.equal(breadcrumbLinks[0].textContent.trim(), 'tools');
    assert.equal(breadcrumbLinks[0].getAttribute('href'), '/tools');
    assert.equal(breadcrumbLinks[1].textContent.trim(), 'sledgehammer');
    assert.equal(breadcrumbLinks[1].getAttribute('href'), '/tools/hammer');

    await click(document.querySelectorAll('.map-link')[5]);

    breadcrumbLinks = document.querySelectorAll('.breadcrumbs a');

    assert.equal(breadcrumbLinks.length, 3);
    assert.equal(breadcrumbLinks[0].textContent.trim(), 'tools');
    assert.equal(breadcrumbLinks[0].getAttribute('href'), '/tools');
    assert.equal(breadcrumbLinks[1].textContent.trim(), 'sledgehammer');
    assert.equal(breadcrumbLinks[1].getAttribute('href'), '/tools/hammer');
    assert.equal(breadcrumbLinks[2].textContent.trim(), 'new');
    assert.equal(breadcrumbLinks[2].getAttribute('href'), '/tools/hammer/new');
  });
});
