# -*- coding: utf-8 -*-
# Generated by Django 1.11.29 on 2020-04-06 21:29
from __future__ import unicode_literals

import wagtail.core.blocks
import wagtail.core.fields
import wagtail.images.blocks
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('form_explainer', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formexplainerpage',
            name='header',
            field=wagtail.core.fields.StreamField([('hero', wagtail.core.blocks.StructBlock([('heading', wagtail.core.blocks.CharBlock(help_text='For complete guidelines on creating heroes, visit our <a href="https://cfpb.github.io/design-system/components/heroes">Design System</a>. Character counts (including spaces) at largest breakpoint:<ul class="help">    <li>&bull; 41 characters max (one-line heading)</li>    <li>&bull; 82 characters max (two-line heading)</li></ul>', required=False)), ('body', wagtail.core.blocks.RichTextBlock(help_text='Character counts (including spaces) at largest breakpoint:<ul class="help">    <li>&bull; 165-186 characters (after a one-line heading)</li>    <li>&bull; 108-124 characters (after a two-line heading)</li></ul>', label='Sub-heading', required=False)), ('image', wagtail.images.blocks.ImageChooserBlock(help_text='When saving illustrations, use a transparent background. <a href="https://cfpb.github.io/design-system/components/heroes#style">See image dimension guidelines.</a>', label='Large image', required=False)), ('small_image', wagtail.images.blocks.ImageChooserBlock(help_text='<b>Optional.</b> Provides an alternate image for small displays when using a photo or bleeding hero. Not required for the standard illustration. <a href="https://cfpb.github.io/design-system/components/heroes#style">See image dimension guidelines.</a>', required=False)), ('background_color', wagtail.core.blocks.CharBlock(help_text='Specify a hex value (including the # sign) from our <a href="https://cfpb.github.io/design-manual/brand-guidelines/color-principles.html">official color palette</a>.', required=False)), ('is_white_text', wagtail.core.blocks.BooleanBlock(help_text='<b>Optional.</b> Turns the hero text white. Useful if using a dark background color or background image.', label='White text', required=False)), ('is_overlay', wagtail.core.blocks.BooleanBlock(help_text='<b>Optional.</b> Uses the large image as a background under the entire hero, creating the "Photo" style of hero (see <a href="https://cfpb.github.io/design-system/components/heroes">Design System</a> for details). When using this option, make sure to specify a background color (above) for the left/right margins that appear when screens are wider than 1200px and for the text section when the photo and text stack at mobile sizes.', label='Photo', required=False)), ('is_bleeding', wagtail.core.blocks.BooleanBlock(help_text='<b>Optional.</b> Select if you want the illustration to bleed vertically off the top and bottom of the hero space.', label='Bleed', required=False))])), ('text_introduction', wagtail.core.blocks.StructBlock([('eyebrow', wagtail.core.blocks.CharBlock(help_text='Optional: Adds an H5 eyebrow above H1 heading text. Only use in conjunction with heading.', label='Pre-heading', required=False)), ('heading', wagtail.core.blocks.CharBlock(required=False)), ('intro', wagtail.core.blocks.RichTextBlock(required=False)), ('body', wagtail.core.blocks.RichTextBlock(required=False)), ('links', wagtail.core.blocks.ListBlock(wagtail.core.blocks.StructBlock([('text', wagtail.core.blocks.CharBlock(required=False)), ('url', wagtail.core.blocks.CharBlock(default='/', required=False))]), required=False)), ('has_rule', wagtail.core.blocks.BooleanBlock(help_text='Check this to add a horizontal rule line to bottom of text introduction.', label='Has bottom rule', required=False))]))], blank=True),
        ),
    ]
