import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery/lib/ngx-gallery-image';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery/lib/ngx-gallery-options';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.user = data.user;
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
      {
        // arrowPrevIcon: 'fa fa-arrow-circle-o-left',
        // arrowNextIcon: 'fa fa-arrow-circle-o-right',
        closeIcon: 'fa fa-window-close',
        // fullscreenIcon: 'fa fa-arrows',
        spinnerIcon: 'fa fa-refresh fa-spin fa-3x fa-fw',
        previewFullscreen: true,
        imageArrowsAutoHide: true,
        thumbnailsArrowsAutoHide: true,
      },
      {
        breakpoint: 500,
        width: '300px',
        height: '300px',
        thumbnailsColumns: 3,
      },
      {
        breakpoint: 300,
        width: '100%',
        height: '200px',
        thumbnailsColumns: 2,
      },
    ];

    this.galleryImages = this.getImages();
  }

  getImages(): any[] {
    const imageUrls = [];

    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description,
        dateAdded: photo.dateAdded,
      });
    }

    return imageUrls;
  }
}
