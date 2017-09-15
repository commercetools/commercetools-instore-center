InStore
==================

[![Build Status](https://api.travis-ci.com/commercetools/commercetools-instore-center.svg?token=G3zYkVxzDwVADM6vtKUL&branch=master)](https://travis-ci.com/commercetools/commercetools-instore-center)

## Synopsis

The Commercetools in store app allows customers to manage order reservations from the Sunrise mobile app, reviewing customer insights and checking inventory entries for different channels.

## Motivation

The motivation of this app is to allow sales force to engage customers and improving the shopping experience by using the information already existing in the Commercetools platform and machine learning features.


## Dashboard

![dashboard](https://user-images.githubusercontent.com/576460/30800463-5c73f3b2-a1e0-11e7-8e33-6596a4b411ea.jpg)

Allows you to briefly display the sales, orders, customers and stocks for the selected store. The dashboard also allows the user to filter by dates in order to get the required info based on a desired period of time.


## [Inventories](https://github.com/commercetools/commercetools-instore-center/blob/documentation/docs/inventories.md)

![inventories](https://user-images.githubusercontent.com/576460/30800470-607261f6-a1e0-11e7-9912-2595e7a1b699.jpg)

In the inventories section, products of the selected store are displayed indicating the available quantity. You can access the product details from this list by clicking on the row and also check the availability of the product in any other store sorted by distance.

When clicking on the check button, a new window will be shown displaying the availability of the selected product in the different channels and sorting the results by distance from the store (from nearest to farthest).

![availability](https://user-images.githubusercontent.com/576460/30800724-3b31fea0-a1e1-11e7-8485-dd929f6f3e60.jpg)

The following image shows how the product details page is displayed when clicking on the product row from the inventory list where the user cat get some details from the product and some related products that can be recommended to the customer.

![inventoriesdetail](https://user-images.githubusercontent.com/576460/30802693-a0d31824-a1e7-11e7-8609-472426a93c6b.jpg)


## [Orders](https://github.com/commercetools/commercetools-instore-center/blob/documentation/docs/orders.md)

![orders](https://user-images.githubusercontent.com/576460/30800482-6963d4ca-a1e0-11e7-83f9-840fb873fb03.jpg)

This section shows the list of orders that has been processed by the Sunrise mobile app. In this section the user can confirm the order and process it whenever a customer comes to the store to pick up the items. The user can also cancel an order if needed. This actions can be performed directly on the list by clicking on the *Process* button or in the order details page which is detailed in the following screenshot:

![orderdetail](https://user-images.githubusercontent.com/576460/30800883-bedc39e6-a1e1-11e7-815d-56ad2afc3d66.jpg)


## [Customers](https://github.com/commercetools/commercetools-instore-center/blob/documentation/docs/customers.md)

![customers](https://user-images.githubusercontent.com/576460/30800479-654af6ca-a1e0-11e7-939b-8a2f231b4847.jpg)

List of customers related to the store. Provides quick access to common store customers. The user can also access to the customer details page where can see the customer insights, for instance latests items the customer purchased and some recommendations based on the latest orders or preferences.

The following image shows how the customer details page looks like:

![customerinsights](https://user-images.githubusercontent.com/576460/30802006-732505e2-a1e5-11e7-9a48-225ecb221a45.jpg)

![customerrecomended](https://user-images.githubusercontent.com/576460/30802271-3534a57a-a1e6-11e7-9485-e59344845957.jpg)


--------

## Demo
https://instore-stage.ct-app.com/


## Installation
```
npm install
```

## App launch
```
gulp
```

The app should be available in your local machine in: http://localhost:3000
