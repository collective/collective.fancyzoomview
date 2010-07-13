from setuptools import setup, find_packages
import os

version = '1.0.1'

setup(name='collective.fancyzoomview',
      version=version,
      description="Smooth javascript image zooming for Plone folders and topics.",
      long_description=open("README.txt").read() + "\n" +
                       open("CHANGES.txt").read(),
      # Get more strings from http://www.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Framework :: Plone",
        "Programming Language :: Python",
        "Topic :: Software Development :: Libraries :: Python Modules",
        ],
      keywords='plone javascript image',
      author='Timo Stollenwerk',
      author_email='timo@zmag.de',
      url='http://pypi.python.org/pypi/collective.fancyzoomview',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['collective'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          # -*- Extra requirements: -*-
      ],
      entry_points="""
      # -*- Entry points: -*-
      """,
      )
