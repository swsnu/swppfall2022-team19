# Generated by Django 4.1.1 on 2022-11-08 05:28

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('product_id', models.IntegerField()),
                ('scores', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(), blank=True, size=None)),
                ('comment', models.TextField(blank=True)),
                ('likedCount', models.IntegerField()),
                ('liked', models.IntegerField()),
            ],
        ),
    ]