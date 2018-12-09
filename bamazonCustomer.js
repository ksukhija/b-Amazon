'use strict';

// Load the packages used in this exercise
var mysql = require("mysql");
var inquirer = require("inquirer");

// MYSQL Database constant parameters
const MYSQL_HOST = "localhost";
const MYSQL_PORT = 3306;
const MYSQL_USER = "root";
const MYSQL_PASSWORD = "I1am2god3!";

//Database to connect to
const MYSQL_DB_2_CONNECT = "bAmazon";

// Create Connection to the bAmazon database
var bAmazonDB_connection = mysql.createConnection(
    {
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        user: MYSQL_USER,
        password: MYSQL_PASSWORD,
        database: MYSQL_DB_2_CONNECT
    }
);


//connect 
bAmazonDB_connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + bAmazonDB_connection.threadId);

    getCustomerOrder();


});



/**
 * Displays all items for sale in the items_tbl Table of the bAmazon database
 * and gets customers purchase order
 */
function getCustomerOrder() {
    var questions = [
        // Get the ID of the prodcut to purchase.
        {
            type: "input",
            message: "Enter the Item(Id) you would like to purchase: ",
            name: "itemId"
        },
        // Get the qty 
        {
            type: "input",
            message: "Enter the quantity to purchase: ",
            name: "qty"
        }
    ]

    // Get the items for sale from the items_tbl 
    bAmazonDB_connection.query("SELECT * FROM items_tbl", function (err, resp) {
        if (err) throw err;

        //show items for sale
        //console.table(resp);
        console.log(resp.length);
        console.log("| " + ("ITEM Id").padEnd(10, " ") + "| " + ("ITEM DESCRIPTION").padEnd(40, " ") + "| " + ("PRICE").padEnd(6, ' ') + " |");
        console.log("|" + ("").padEnd(11, "=") + ("|").padEnd(42, "=") + ("|").padEnd(9, "=") +"|");
        for (var i=0; i<resp.length; i++) {
             var padded_id = ((resp[i].id).toString()).padEnd(10," ");
             var padded_item_name = (resp[i].item_name).padEnd(40, " ");
             var padded_price = ((resp[i].price).toString()).padEnd(6, " ");
             console.log(`| ${padded_id}| ${padded_item_name}| $${padded_price}|`);
         }

        // Create a "Prompt" with a series of questions.
        inquirer.prompt(questions).then(inquirerResponse => {

            var totalCost = resp[inquirerResponse.itemId - 1].price * inquirerResponse.qty;

            // check if we have sufficient inventory to fulfill the order
            if (resp[inquirerResponse.itemId - 1].stock_qty >= inquirerResponse.qty) {
                console.log(`Thank you for your Order. Your total cost is $${totalCost}.`);

                // update the database with the new qty for the item
                var newQty = resp[inquirerResponse.itemId - 1].stock_qty - inquirerResponse.qty;

                bAmazonDB_connection.query(
                    "UPDATE items_tbl SET stock_qty=? WHERE id = ?", [newQty, inquirerResponse.itemId], function (error) {
                        if (error) throw error;
                        bAmazonDB_connection.query("SELECT * FROM items_tbl", function (err, resp) {
                            if (err) throw err;
                            //show items for sale
                            console.log("Inventory after the Sale:");
                            console.table(resp);
                            bAmazonDB_connection.end();
                        });

                    }
                );


            } else {
                console.log("Sorry, we do not have sufficient quantity to fulfill your order. Try later...");
            }

        });


    });

}


