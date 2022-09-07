from django.template.response import TemplateResponse

from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.core import blocks
from wagtail.core.fields import StreamField
from wagtail.search import index

from v1 import blocks as v1_blocks
from v1.atomic_elements import organisms, schema
from v1.feeds import get_appropriate_rss_feed_url_for_page
from v1.models.learn_page import AbstractFilterPage


class BlogPage(AbstractFilterPage):
    content = StreamField(
        [
            ("full_width_text", organisms.FullWidthText()),
            ("info_unit_group", organisms.InfoUnitGroup()),
            ("expandable", organisms.Expandable()),
            ("well", organisms.Well()),
            ("video_player", organisms.VideoPlayer()),
            (
                "email_signup",
                v1_blocks.EmailSignUpChooserBlock(),
            ),
            ("faq_schema", schema.FAQ(label="FAQ schema")),
            ("how_to_schema", schema.HowTo(label="HowTo schema")),
        ]
    )
    edit_handler = AbstractFilterPage.generate_edit_handler(
        content_panel=StreamFieldPanel("content")
    )
    template = "blog/blog_page.html"

    search_fields = AbstractFilterPage.search_fields + [
        index.SearchField("content")
    ]

    def get_context(self, request, *args, **kwargs):
        context = super().get_context(request, *args, **kwargs)

        context["rss_feed"] = get_appropriate_rss_feed_url_for_page(
            self, request=request
        )

        return context

    @property
    def preview_modes(self):
        return super().preview_modes + [
            ('list_view', 'List view'),
        ]

    def serve_preview(self, request, mode_name):
        if mode_name != 'list_view':
            return super().serve_preview(request, mode_name)

        return TemplateResponse(
            request,
            'blog/blog_page_list_preview.html',
            {
                'post': self,
            }
        )


class LegacyBlogPage(AbstractFilterPage):
    content = StreamField(
        [
            (
                "content",
                blocks.RawHTMLBlock(
                    help_text="Content from WordPress unescaped."
                ),
            ),
            (
                "reusable_text",
                v1_blocks.ReusableTextChooserBlock("v1.ReusableText"),
            ),
        ]
    )

    edit_handler = AbstractFilterPage.generate_edit_handler(
        content_panel=StreamFieldPanel("content")
    )
    template = "blog/blog_page.html"

    search_fields = AbstractFilterPage.search_fields + [
        index.SearchField("content")
    ]
