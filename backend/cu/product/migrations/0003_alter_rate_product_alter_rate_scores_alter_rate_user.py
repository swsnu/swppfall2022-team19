# Generated by Django 4.1.1 on 2022-11-13 12:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('product', '0002_score_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rate',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.product'),
        ),
        migrations.AlterField(
            model_name='rate',
            name='scores',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='product.score'),
        ),
        migrations.AlterField(
            model_name='rate',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
