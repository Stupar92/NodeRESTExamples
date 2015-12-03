/**
 * This file is used by the app.js file to load a proper
 * database based on node configuration (prod, dev or test)
 * 
 */
module.exports = {
    db: {
        production:  "mongodb://user:pass@example.com:1234/mgn-user-acc-prod",
        development: "mongodb://localhost/mng-user-acc-dev",
        test:        "mongodb://localhost/mng-user-acc-test",
    }
}