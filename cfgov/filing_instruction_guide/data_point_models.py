from django.db import models

from wagtail.admin.edit_handlers import FieldPanel, InlinePanel

from modelcluster.fields import ParentalKey
from modelcluster.models import ClusterableModel


class DataPoint(ClusterableModel):
    number = models.CharField(max_length=50, blank=True)
    title = models.CharField(max_length=400, blank=True)
    anchor = models.CharField(max_length=400, blank=True)
    rule_section = models.CharField(max_length=100, blank=True)
    intro_text = models.TextField(blank=True)
    panels = [
        FieldPanel("title"),
        FieldPanel("rule_section"),
        FieldPanel("intro_text"),
        InlinePanel("data_fields", label="Data field"),
    ]
    page = ParentalKey(
        "FIGContentPage",
        on_delete=models.CASCADE,
        related_name="data_points",
        blank=True,
        null=True,
    )


class DataFieldJson(models.Model):
    info = models.JSONField(blank=True)
    data_point = ParentalKey(
        "DataPoint",
        on_delete=models.CASCADE,
        related_name="data_fields_json",
        blank=True,
        null=True,
    )
