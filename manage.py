#!/usr/bin/env python
import os
import subprocess
import sys
from pathlib import Path

root = Path(__file__).resolve().parent
project_dir = root / "Portfolio-Page-main" / "backend"
manage_py = project_dir / "manage.py"

if not manage_py.exists():
    print(f"Could not find Django entry point at {manage_py}")
    sys.exit(1)

os.chdir(project_dir)
cmd = [sys.executable, str(manage_py), *sys.argv[1:]]
raise SystemExit(subprocess.call(cmd, cwd=project_dir))
