=================
 Fancy Zoom View
=================

This package contains additional views for the Plone content types folder,
topic and news item. In this testbrowser doctest, we will demonstrate how
the content types work. See test/test_doctest.py for how it is set up.

Setting up and logging in
-------------------------

We use zope.testbrowser to simulate browser interaction in order to show
the main flow of pages. This is not a true functional test, because we also
inspect and modify the internal state of the ZODB, but it is a useful way of
making sure we test the full end-to-end process of creating and modifying
content.

    >>> from Products.Five.testbrowser import Browser
    >>> browser = Browser()
    >>> portal_url = self.portal.absolute_url()

The following is useful when writing and debugging testbrowser tests. It lets
us see error messages properly.

    >>> browser.handleErrors = False
    >>> self.portal.error_log._ignored_exceptions = ()

We then turn off the various portlets, because they sometimes duplicate links
and text (e.g. the navtree, the recent recent items listing) that we wish to
test for in our own views. Having no portlets makes things easier.

    >>> from zope.component import getUtility, getMultiAdapter
    >>> from plone.portlets.interfaces import IPortletManager
    >>> from plone.portlets.interfaces import IPortletAssignmentMapping

    >>> left_column = getUtility(IPortletManager, name=u"plone.leftcolumn")
    >>> left_assignable = getMultiAdapter((self.portal, left_column), IPortletAssignmentMapping)
    >>> for name in left_assignable.keys():
    ...     del left_assignable[name]

    >>> right_column = getUtility(IPortletManager, name=u"plone.rightcolumn")
    >>> right_assignable = getMultiAdapter((self.portal, right_column), IPortletAssignmentMapping)
    >>> for name in right_assignable.keys():
    ...     del right_assignable[name]

Finally, we need to log in as the portal owner, i.e. an administrator user. We
do this from the login page.

    >>> from Products.PloneTestCase.setup import portal_owner, default_password

	>>> browser.open(portal_url + '/login_form?came_from=' + portal_url)
    >>> browser.getControl(name='__ac_name').value = portal_owner
    >>> browser.getControl(name='__ac_password').value = default_password
    >>> browser.getControl(name='submit').click()

Adding a folder with fancy image zooming
----------------------------------------

Add a folder:

    >>> browser.open(portal_url)
    >>> browser.getLink(id='folder').click()
    >>> browser.getControl(name='title').value = "Fancy Folder"
    >>> browser.getControl(name='description').value = "Folder with fancy zooming images."
    >>> browser.getControl(name='form_submit').click()

Test, if the folder is available:

    >>> 'fancy-folder' in self.portal.objectIds()
    True
    >>> fancy_folder = self.portal['fancy-folder']
    >>> fancy_folder_url = fancy_folder.absolute_url()

We need two fake images:

    >>> import StringIO
    >>> dummy_image1 = StringIO.StringIO('Dummy fancy zoom image contents')
    >>> dummy_image2 = StringIO.StringIO('Dummy fancy zoom image contents')

Now let us add the two images:

    >>> browser.open(fancy_folder_url)
    >>> browser.getLink(id='image').click()
    >>> browser.getControl(name='title').value = "Fancy Image 1"
    >>> browser.getControl(name='description').value = "First fancy image."
    >>> browser.getControl(name='image_file').mech_control.add_file(dummy_image1, filename='dummy1.png')
    >>> browser.getControl(name='form_submit').click()

    >>> browser.open(fancy_folder_url)
    >>> browser.getLink(id='image').click()
    >>> browser.getControl(name='title').value = "Fancy Image 2"
    >>> browser.getControl(name='description').value = "Second fancy image."
    >>> browser.getControl(name='image_file').mech_control.add_file(dummy_image2, filename='dummy2.png')
    >>> browser.getControl(name='form_submit').click()

Verify that fancy zoom view is available for folders:

    >>> browser.open(fancy_folder_url)
    >>> browser.getLink(id='fancy_zoom_view').url.endswith("selectViewTemplate?templateId=fancy_zoom_view")
    True

Adding a topic with fancy image zooming
---------------------------------------

    >>> browser.open(portal_url)
    >>> browser.getLink(id='topic').click()
    >>> browser.getControl(name='title').value = "Fancy Topic"
    >>> browser.getControl(name='description').value = "Topic with fancy zooming images."
    >>> browser.getControl(name='text').value = "This is a topic with <em>fancy zooming</em> images."
    >>> browser.getControl(name='form_submit').click()

Verify that fancy zoom view is available for topics:

    >>> browser.open(fancy_folder_url)
    >>> browser.getLink(id='fancy_zoom_view').url.endswith("selectViewTemplate?templateId=fancy_zoom_view")
    True

Adding a News Item with fancy image zooming
-------------------------------------------

There should be an object called 'news' in the portal root.

    >>> 'news' in self.portal.objectIds()
    True
    >>> news = self.portal['news']
    >>> news_url = news.absolute_url()

Adding a news item with an image:

    >>> browser.open(news_url)
    >>> browser.getLink(id='news-item').click()
    >>> browser.getControl(name='title').value = "Fancy News Item"
    >>> browser.getControl(name='description').value = "News Item with fancy image zooming."
    >>> browser.getControl(name='image_file').mech_control.add_file(dummy_image1, filename='dummy1.png')
    >>> browser.getControl(name='form_submit').click()