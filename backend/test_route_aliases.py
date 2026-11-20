"""Testes de compatibilidade das rotas publicas do AlertaCalor."""

import unittest

from main import app


class RouteAliasTests(unittest.TestCase):
    def test_portuguese_route_aliases_are_registered(self):
        routes = {(method, route.path) for route in app.routes for method in route.methods}

        self.assertIn(("POST", "/telemetria"), routes)
        self.assertIn(("GET", "/leitura"), routes)
        self.assertIn(("GET", "/historico"), routes)


if __name__ == "__main__":
    unittest.main()
