Introduction
============

collective.fancyzoomview provides smooth Javascript image zooming for Plone folders and topics loosely based on Cabel Maxfield Sasser's `Fancy Zoom`.

.. _`Fancy Zoom`: http://www.cabel.name/2008/02/fancyzoom-10.html

Since version 0.3, collective.fancyzoomview is based on `Steve Smith's jquery version of Fancy Zoom`.

.. _`Steve Smith's jquery version of Fancy Zoom`: http://orderedlist.com/articles/fancyzoom-meet-jquery

Buildout Installation
=====================

Add the following code to your buildout.cfg::

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

If you also want Fancy Zoom for News Items add the following code to your buildout.cfg::

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
      collective.fancyzoomview-overrides
  ...

