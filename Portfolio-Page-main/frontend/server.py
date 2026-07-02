"""
Minimal Python static file server for the frontend.
Serves index.html and all assets with correct MIME types.
Run: python server.py
"""
import http.server
import socketserver
import os

PORT = 5500
DIRECTORY = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, fmt, *args):
        print(f"  [{self.address_string()}] {fmt % args}")


with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Frontend serving at http://0.0.0.0:{PORT}")
    httpd.serve_forever()
