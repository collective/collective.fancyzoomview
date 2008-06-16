Introduction
============

collective.fancyzoom provides smooth javascript image zooming for Plone folders and topics based on Cabel Maxfield Sasser Fancy Zoom_.

.. _Fancy Zoom: http://www.cabel.name/2008/02/fancyzoom-10.html

The wrapper code of collective.fancyzoom is released under the GPL, but please consider the licence issue of the Fancy Zoom javascript below.

Fancy Zoom Javascript License
=============================

FancyZoom is totally free for your non-commercial website.

In a bit of an experiment: if your website is commercial (i.e. makes you money), you can license FancyZoom for $39 per site, a one-time fee. Instantly add nice image zooming to your site. Click https://www.panic.com/fancy/buy.html to instantly and securely buy a license.

Buildout Installation
=====================

Add the following code to your buildout.cfg

  [buildout]
  ...
  eggs =
      ...
      collective.fancyzoomview
      ...

  ...
  [instance]
  ...
  zcml =
      ...
      collective.fancyzoomview
  ...