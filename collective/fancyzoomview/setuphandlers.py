from Products.CMFCore.utils import getToolByName
from Products.CMFEditions.setuphandlers import DEFAULT_POLICIES

def setupView(portal, out):
    """ Add fancy zoom view to folder type """

    typesTool = getToolByName(portal, 'portal_types')

    # install fancy zoom view for folders
    typefolder = typesTool['Folder']
    viewlist = typefolder.getProperty('view_methods', d=None)
    if 'fancy_zoom_view' not in viewlist:
        viewlist = viewlist + ('fancy_zoom_view',)
    typefolder.manage_changeProperties(view_methods = viewlist)
    out.append("Successfully installed fancy zoom view for folders")

    # install fancy zoom view for topics
    typefolder = typesTool['Topic']
    viewlist = typefolder.getProperty('view_methods', d=None)
    if 'fancy_zoom_view' not in viewlist:
        viewlist = viewlist + ('fancy_zoom_view',)
    typefolder.manage_changeProperties(view_methods = viewlist)
    out.append("Successfully installed fancy zoom view for topics")

def importVarious(context):
    """Miscellanous steps import handle """

    # Ordinarily, GenericSetup handlers check for the existence of XML files.
    # Here, we are not parsing an XML file, but we use this text file as a
    # flag to check that we actually meant for this import step to be run.
    # The file is found in profiles/default.

    if context.readDataFile('collective.fancyzoomview_various.txt') is None:
        return

    out = []

    portal = context.getSite()

    setupView(portal, out)
    logger = context.getLogger("collective.fancyzoomview")