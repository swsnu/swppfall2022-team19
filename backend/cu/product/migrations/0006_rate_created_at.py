# Generated by Django 4.1.1 on 2022-12-04 18:57

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_rate_averagescore'),
    ]

    operations = [
        migrations.AddField(
            model_name='rate',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]