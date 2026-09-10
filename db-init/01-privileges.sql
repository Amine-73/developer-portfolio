-- Ensures portfolio_user only has the privileges the app actually needs.
-- Runs automatically on first initialization of a fresh MySQL data volume.

REVOKE ALL PRIVILEGES ON *.* FROM 'portfolio_user'@'%';
GRANT SELECT, INSERT, UPDATE, DELETE ON `portfolio`.* TO 'portfolio_user'@'%';
FLUSH PRIVILEGES;
