# TODO

## 1) Repo cleanup (duplicate folders)
- Keep: `Portfolio-Page-main/backend`, `Portfolio-Page-main/frontend`
- Delete: root-level `backend/`, root-level `frontend/`

## 2) Frontend: use local backend by default
- Edit `Portfolio-Page-main/frontend/js/api.js`
  - Change `API_BASE` to default `http://localhost:8000/api/v1`
  - Keep sandbox as fallback (optional)

## 3) Frontend: remove hard-coded sandbox in projects page
- Edit `Portfolio-Page-main/frontend/js/pages/projects.js`
  - Use shared API client instead of direct sandbox fetch

## 4) Validate
✅ Run Django migrations
✅ Run seed_data command
✅ Start Django server on port 8000
✅ Start frontend server and verify UI/API loads


## 5) Repo cleanup completed
- Removed root-level duplicate folders: `backend/` and `frontend/`

