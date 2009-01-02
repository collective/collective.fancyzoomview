from Products.Five import zcml
from Products.Five import fiveconfigure

from Testing import ZopeTestCase as ztc

from Products.PloneTestCase import PloneTestCase as ptc
from Products.PloneTestCase.layer import onsetup

@onsetup
def setup_collecitve_fancyzoomview():
    """Set up the collective fancy zoom package

    The @onsetup decorator causes the execution of this body to be deferred
    until the setup of the Plone site testing layer.
    """

    # Load the ZCML configuration for the collective.fancyzoomview package.
    # This includes the other products below as well.

    fiveconfigure.debug_mode = True
    import collective.fancyzoomview
    zcml.load_config('configure.zcml', collective.fancyzoomview)
    fiveconfigure.debug_mode = False

    # We need to tell the testing framework that these products
    # should be available. This can't happen until after we have loaded
    # the ZCML.

    ztc.installPackage('collective.fancyzoomview')

# The order here is important: We first call the (deferred) function which
# installs the products we need for the Optilux package. Then, we let
# PloneTestCase set up this product on installation.

setup_collecitve_fancyzoomview()
ptc.setupPloneSite(products=['collective.fancyzoomview'])

class FancyZoomViewTestCase(ptc.PloneTestCase):
    """Base class used for test cases
    """

class FancyZoomViewFunctionalTestCase(ptc.FunctionalTestCase):
    """Test case class used for functional (doc-)tests
    """