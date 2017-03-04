import test from 'ava';
import * as Kindergarten from 'kindergarten';
import * as VueKindergarten from '../../src';
import install from '../../src/vue-kindergarten/install';

test('exports install method by default', (t) => {
  t.is(VueKindergarten.default.install, install);
});

test('exports AccessDenied from kindergarten', (t) => {
  t.is(Kindergarten.AccessDenied, VueKindergarten.AccessDenied);
});

test('exports ArgumentError from kindergarten', (t) => {
  t.is(Kindergarten.ArgumentError, VueKindergarten.ArgumentError);
});

test('exports BaseObject from kindergarten', (t) => {
  t.is(Kindergarten.BaseObject, VueKindergarten.BaseObject);
});

test('exports EasyGoverness from kindergarten', (t) => {
  t.is(Kindergarten.EasyGoverness, VueKindergarten.EasyGoverness);
});

test('exports GermanGoverness from kindergarten', (t) => {
  t.is(Kindergarten.GermanGoverness, VueKindergarten.GermanGoverness);
});

test('exports HeadGoverness from kindergarten', (t) => {
  t.is(Kindergarten.HeadGoverness, VueKindergarten.HeadGoverness);
});

test('exports Logger from kindergarten', (t) => {
  t.is(Kindergarten.Logger, VueKindergarten.Logger);
});

test('exports MiddlewareGoverness from kindergarten', (t) => {
  t.is(Kindergarten.MiddlewareGoverness, VueKindergarten.MiddlewareGoverness);
});

test('exports NoExposedMethodError from kindergarten', (t) => {
  t.is(Kindergarten.NoExposedMethodError, VueKindergarten.NoExposedMethodError);
});

test('exports NoGovernessError from kindergarten', (t) => {
  t.is(Kindergarten.NoGovernessError, VueKindergarten.NoGovernessError);
});

test('exports NoPurposeError from kindergarten', (t) => {
  t.is(Kindergarten.NoPurposeError, VueKindergarten.NoPurposeError);
});

test('exports NoSandboxError from kindergarten', (t) => {
  t.is(Kindergarten.NoSandboxError, VueKindergarten.NoSandboxError);
});

test('exports Perimeter from kindergarten', (t) => {
  t.is(Kindergarten.Perimeter, VueKindergarten.Perimeter);
});

test('exports PubSub from kindergarten', (t) => {
  t.is(Kindergarten.PubSub, VueKindergarten.PubSub);
});

test('exports Purpose from kindergarten', (t) => {
  t.is(Kindergarten.Purpose, VueKindergarten.Purpose);
});

test('exports RestrictedMethodError from kindergarten', (t) => {
  t.is(Kindergarten.RestrictedMethodError, VueKindergarten.RestrictedMethodError);
});

test('exports Rule from kindergarten', (t) => {
  t.is(Kindergarten.Rule, VueKindergarten.Rule);
});

test('exports Sandbox from kindergarten', (t) => {
  t.is(Kindergarten.Sandbox, VueKindergarten.Sandbox);
});

test('exports StrictGoverness from kindergarten', (t) => {
  t.is(Kindergarten.StrictGoverness, VueKindergarten.StrictGoverness);
});

test('exports VERSION from kindergarten', (t) => {
  t.is(Kindergarten.VERSION, VueKindergarten.VERSION);
});

test('exports WrongRuleDefinition from kindergarten', (t) => {
  t.is(Kindergarten.WrongRuleDefinition, VueKindergarten.WrongRuleDefinition);
});

test('exports createPerimeter from kindergarten', (t) => {
  t.is(Kindergarten.createPerimeter, VueKindergarten.createPerimeter);
});

test('exports createRule from kindergarten', (t) => {
  t.is(Kindergarten.createRule, VueKindergarten.createRule);
});

test('exports createSandbox from kindergarten', (t) => {
  t.is(Kindergarten.createSandbox, VueKindergarten.createSandbox);
});

test('exports guard from kindergarten', (t) => {
  t.is(Kindergarten.guard, VueKindergarten.guard);
});

test('exports sandbox from kindergarten', (t) => {
  t.is(Kindergarten.sandbox, VueKindergarten.sandbox);
});

test('exports isGoverness from kindergarten', (t) => {
  t.is(Kindergarten.isGoverness, VueKindergarten.isGoverness);
});

test('exports isPerimeter from kindergarten', (t) => {
  t.is(Kindergarten.isPerimeter, VueKindergarten.isPerimeter);
});

test('exports isPurpose from kindergarten', (t) => {
  t.is(Kindergarten.isPurpose, VueKindergarten.isPurpose);
});

test('exports isRule from kindergarten', (t) => {
  t.is(Kindergarten.isRule, VueKindergarten.isRule);
});

test('exports isSandbox from kindergarten', (t) => {
  t.is(Kindergarten.isSandbox, VueKindergarten.isSandbox);
});
