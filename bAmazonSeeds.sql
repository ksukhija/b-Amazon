-- Delete the database if it already exist 
DROP DATABASE IF EXISTS bAmazon;

-- Create the database
CREATE DATABASE bAmazon;

-- tell mysql to use the bAmazon database 
USE bAmazon;

-- Schema for the bAmazon Database
CREATE TABLE items_tbl (
    id INT NOT NULL AUTO_INCREMENT,
    item_name CHAR(50),
    dept_name CHAR(30),
    price  INT NOT NULL,
    stock_qty INT, 
    PRIMARY KEY(id)
);

-- populate the items table
INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("Bongo Grooves for Beginners DVD", "Musicals", 14.99, 8);

INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("iPhone XS Case", "Cell Phone", 11.99, 50);

INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("USB 4-port Hub", "Electronics", 9.89, 25);

INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("Socks", "Clothing", 6.75, 90);

INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("Web Design with HTML, CSS and JS", "Books", 28.69, 10);

INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("Dog Food", "Pet Supplies", 12.95, 20);

INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("Geometry Grade 8", "Books", 65.95, 10);

INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("Milk Bone Dentral Dog Treats", "Pet Supplies", 7.78, 50);

INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("Tommy Hilfiger T-Shirt", "Clothing", 14.99, 8);

INSERT INTO items_tbl(item_name, dept_name, price, stock_qty)
VALUES("Headbands", "Clothing", 9.99, 50);

