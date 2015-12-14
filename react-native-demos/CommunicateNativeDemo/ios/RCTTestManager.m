//
//  RCTTestManager.m
//  CommunicateNativeDemo
//
//  Created by coderyi on 15/12/14.
//  Copyright © 2015年 Facebook. All rights reserved.
//

#import "RCTTestManager.h"
#import "AppDelegate.h"
#import "RCTEventDispatcher.h"
@import UIKit;

@implementation RCTTestManager
@synthesize bridge=_bridge;

- (id)init{
  
  self = [super init];
  if (!self) {
    return nil;
    
  }

  return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(shareURL:(NSString *)URLString)
{
  // Some native code
//  NSArray *objectsToShare = @[[NSURL URLWithString:URLString]];
//  UIActivityViewController *activityVC = [[UIActivityViewController alloc] initWithActivityItems:objectsToShare applicationActivities:nil];
//  
//  UIViewController *rootController = UIApplication.sharedApplication.delegate.window.rootViewController;
//  
//  dispatch_async(dispatch_get_main_queue(), ^{
//    [rootController presentViewController:activityVC animated:YES completion:nil];
//  });
  //注意这里是子线程，UI更新需要运行在主线程
  NSLog(@"%@",URLString);
}
//JS调用Native
RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  NSLog(@"Pretending to create an event %@ at %@", name, location);
  //Native调用JS的方法
  [self calendarEventReminderReceived:@"notification"];

}

//JS调用Native,并且Native传值回JS
RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  
  callback(@[[NSNull null], @"xc"]);
}

- (void)calendarEventReminderReceived:(NSString *)notification
{
  NSString *eventName = notification;

  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
                                               body:@{@"name": eventName}];
}

@end
